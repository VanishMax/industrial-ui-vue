<template>
  <label :class="wrapperClasses">
    <span :class="leftLabelClasses">
      <slot name="left-label">
        {{ labelLeft }}
      </slot>
    </span>

    <input
      :id="id"
      type="checkbox"
      :name="name"
      :checked="checked"
      :class="inputClasses"
      :disabled="disabled"
      @change="change"
    />
    <span :class="toggleBaseClasses">
      <slot></slot>
    </span>

    <span :class="rightLabelClasses">
      <slot name="right-label">
        {{ labelRight }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';

  export default Vue.extend({
    name: 'IuiToggle',
    model: {
      prop: 'value',
      event: 'toggle',
    },
    props: {
      /**
       * Identifications of the toggle – will be passed to the input
       */
      id: String,
      name: String,

      /**
       * Control the value of the toggle
       */
      value: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Text labels from both sides of the toggle
       */
      labelLeft: String,
      labelRight: String,

      /**
       * Dynamic classes for html-elements of the toggle: input, base (toggle itself),
       * left and right label spans
       */
      inputClass: String,
      baseClass: String,
      leftLabelClass: String,
      rightLabelClass: String,
    },
    data () {
      return {
        checked: this.value,
      };
    },
    computed: {
      wrapperClasses (): string | null {
        const component = this.$iui.config.components.toggle;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.checked ? component.checkedClass : component.uncheckedClass,
          this.disabled ? component.disabledClass : ''
        );
      },
      toggleBaseClasses (): string | null {
        const component = this.$iui.config.components.toggle;
        return composeClasses(
          this.baseClass,
          component.baseClass
        );
      },
      inputClasses (): string|null {
        const component = this.$iui.config.components.toggle;
        return composeClasses(
          this.inputClass,
          component.inputClass
        );
      },
      leftLabelClasses (): string|null {
        const component = this.$iui.config.components.toggle;
        return composeClasses(
          this.leftLabelClass,
          component.labelClass,
          component.leftLabelClass
        );
      },
      rightLabelClasses (): string|null {
        const component = this.$iui.config.components.toggle;
        return composeClasses(
          this.rightLabelClass,
          component.labelClass,
          component.rightLabelClass
        );
      },
    },
    watch: {
      value (val) {
        if (this.checked !== val) this.checked = val;
      },
    },
    methods: {
      change (event: {target: HTMLInputElement}) {
        this.checked = event.target.checked;
        this.$emit('toggle', event.target.checked, event);
      },
    },
  });
</script>
