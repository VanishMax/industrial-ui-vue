<template>
  <button :class="wrapperClasses" @click="$emit('click', $event)">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';

  /**
   * ! WARN !
   * This component is not ready yet and will definitely changed in future!!!
   */
  export default Vue.extend({
    name: 'IuiButton',
    props: {
      label: String,
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to the button's wrapper
       */
      wrapperClasses(): string | null {
        const component = this.$iui.config.components.button;
        return composeClasses(
          this.$iui.config.globalClass,
          isProperties(component.isProperties, this.$attrs),
          component.class
        );
      },
    },
  });
</script>
