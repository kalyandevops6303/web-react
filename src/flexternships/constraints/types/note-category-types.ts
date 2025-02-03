export type NoteCategory = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export type NoteCategoryState = {
  noteCategories: NoteCategory[];
  isNoteCategoriesLoading: boolean;
};

export type NoteCategoryActions = {
  populateNoteCategories: (force?: boolean) => Promise<void>;
  resetStore: () => void;
};

export type NoteCategoryStore = NoteCategoryState & NoteCategoryActions;
