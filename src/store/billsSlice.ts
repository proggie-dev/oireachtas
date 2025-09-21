import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BillDetail } from './../types/Bill';
import { v4 as uuidv4 } from 'uuid';

interface BillsState {
  bills: BillDetail[];
  total: number;
  activeTab: number;
  language: string;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  error: string | null;
}

const initialState: BillsState = {
  bills: [],
  total: 0,
  activeTab: 0,
  language: 'en',
  loading: false,
  page: 0,
  rowsPerPage: 10,
  error: null,
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const version = import.meta.env.VITE_API_VERSION;

export const fetchBills = createAsyncThunk('bills/fetchBills', async (params: string) => {
  const response = await fetch(`${baseUrl}/${version}/legislation${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  const parsedData: BillDetail[] = data.results.map((item: any) => ({
    id: uuidv4(),
    number: Number(item?.bill?.billNo),
    type: item?.bill?.billType,
    status: item?.bill?.status,
    sponsor: item?.bill?.sponsors?.[0]?.sponsor?.as?.showAs || 'N/A',
    isFavorite: false,
    title: {
      enTitle: item?.bill?.shortTitleEn,
      gaTitle: item?.bill?.shortTitleGa,
    },
  }));

  return { bills: parsedData, total: data.head.counts.billCount };
});

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setBills: (state, action: PayloadAction<BillDetail[]>) => {
      state.bills = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.bills = action.payload.bills;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Undefined error';
      });
  },
});

export const { setPage, setRowsPerPage, setLanguage, setBills, setActiveTab } = billsSlice.actions;

export default billsSlice.reducer;
