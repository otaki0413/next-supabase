import create from "zustand";
import { EditedTask, EditedNotice } from "./types/types";

// zustand：型
type State = {
  editedTask: EditedTask;
  editedNotice: EditedNotice;
  updateEditedTask: (payload: EditedTask) => void;
  updateEditedNotice: (payload: EditedNotice) => void;
  resetEditedTask: () => void;
  resetEditedNotice: () => void;
};

/**
 * zunstand：状態管理用のカスタムフック。
 * create関数は状態と更新関数を保持するオブジェクトを作成。
 * useStoreをコンポーネント内で使用すると、これらの状態を取得可能。
 */
export const useStore = create<State>((set) => ({
  editedTask: { id: "", title: "" },
  editedNotice: { id: "", content: "" },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      },
    }),
  resetEditedTask: () => set({ editedTask: { id: "", title: "" } }),
  updateEditedNotice: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: "", content: "" } }),
}));
