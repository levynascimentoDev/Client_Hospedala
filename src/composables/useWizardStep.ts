import { ref } from 'vue'

const onContinue = ref<(() => void | Promise<void>) | null>(null)
const onBack = ref<(() => void) | null>(null)
const canContinue = ref(false)
const canBack = ref(true);

export function useWizardStep() {
    return { onContinue, onBack, canContinue, canBack }
}