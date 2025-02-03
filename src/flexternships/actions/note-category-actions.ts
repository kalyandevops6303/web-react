import { isEmpty } from 'lodash';
import { NoteCategoryState } from '../constraints/types/note-category-types';
import { getNoteCategories } from '../services/project-management-v2';

export const populateNoteCategories = async (
  force: boolean,
  set: (state: Partial<NoteCategoryState> | ((state: NoteCategoryState) => NoteCategoryState)) => void,
  get: () => NoteCategoryState,
) => {
  const noteCategories = get().noteCategories;
  if (!isEmpty(noteCategories) && !force) return;

  set({ isNoteCategoriesLoading: true });
  const fetchedNoteCategories = await getNoteCategories();
  set({ noteCategories: fetchedNoteCategories || [], isNoteCategoriesLoading: false });
};
