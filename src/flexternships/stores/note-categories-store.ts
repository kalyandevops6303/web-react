import { create } from 'zustand';
import { NoteCategoryState, NoteCategoryStore } from '../constraints/types/note-category-types';
import { populateNoteCategories } from '../actions/note-category-actions';

const defaultInitState: NoteCategoryState = {
  noteCategories: [],
  isNoteCategoriesLoading: false,
};

export const useNoteCategoriesStore = create<NoteCategoryStore>((set, get) => ({
  ...defaultInitState,
  populateNoteCategories: (force: boolean = false) => populateNoteCategories(force, set, get),
  resetStore: () => set({ ...defaultInitState }),
}));
