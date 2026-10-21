import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

/** Register the modal ids your app opens globally. */
export type TModalTarget = 'confirm' | 'settings' | '';

export type IModalStore = {
  targetInView: TModalTarget;
  setTargetInView: (target: TModalTarget) => void;
  resetTargetInView: () => void;
};

const useBaseModalStore = create<IModalStore>((set) => ({
  targetInView: '',
  setTargetInView: (target) => set({ targetInView: target }),
  resetTargetInView: () => set({ targetInView: '' }),
}));

export const useModalStore = createSelectorFunctions(useBaseModalStore);
