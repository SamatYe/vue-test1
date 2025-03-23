import { computed } from 'vue';
const props = defineProps({
    width: {
        type: String,
        default: '100%',
    },
    height: {
        type: String,
        default: '20px',
    },
    borderRadius: {
        type: String,
        default: '4px',
    },
});
const loaderStyles = computed(() => ({
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "skeleton-loader" },
    ...{ style: (__VLS_ctx.loaderStyles) },
});
/** @type {__VLS_StyleScopedClasses['skeleton-loader']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            loaderStyles: loaderStyles,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
