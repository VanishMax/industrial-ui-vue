<template>
  <div
    :id="id"
    v-click-outside="close"
    :class="wrapperClasses"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    @touchstart="onHover(true)"
    @touchend="onHover(false)"
  >
    <div
      :class="triggerClasses"
      tabindex="0"
      @click="toggle"
    >
      <slot
        name="trigger"
        :open="open"
        :close="close"
        :value="val"
      />
    </div>

    <IuiTransition
      :name="transitionName"
      v-bind="transitionProps"
      :transition-config="{transitions: $iui.config.transitions}"
    >
      <div v-show="val" v-check-position="{position, positionRelative}" :class="dropdownClasses">
        <slot :open="open" :close="close" :value="val" />
      </div>
    </IuiTransition>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue';
  import type {TransitionOptions} from '@/types/transitions';
  import ClickOutside from 'v-click-outside';
  import checkPosition, {AllowedPosition, DEFAULT_POSITION} from '@/utils/check-position';
  import composeClasses from '@/utils/compose-classes';
  import isProperties from '@/utils/is-properties';
  import IuiTransition from '@/components/Transition/index.vue';

  export default Vue.extend({
    name: 'IuiDropdown',
    components: { IuiTransition },
    directives: { ClickOutside: ClickOutside.directive, checkPosition },
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      /**
       * Control open/close of the dropdown
       */
      value: {
        type: Boolean,
        default: false,
      },

      /**
       * Should the dropdown be opened when the trigger is hovered
       */
      openOnHover: {
        type: Boolean,
        default: false,
      },

      /**
       * Dropdown's id
       */
      id: {
        type: String,
        default: '',
      },

      /**
       * Dynamic classes for trigger and dropdown elements
       */
      triggerClass: {
        type: String,
        default: '',
      },
      dropdownClass: {
        type: String,
        default: '',
      },

      /**
       * Position of the dropdown relative to the trigger element.
       * `auto` will calculate position and prevent dropdown to go out of the parent borders
       */
      position: {
        type: String as PropType<AllowedPosition>,
        default: DEFAULT_POSITION,
        validator: (val: string) => [
          'bottom left',
          'bottom right',
          'top left',
          'top right',
          'auto', // Automatically calculate position to not go out of the borders
        ].includes(val),
      },

      /**
       * If position==='auto' and positionRelative=".selector", then it is displayed within
       * the provided element selector. If not specified – auto-positioned within the window object.
       */
      positionRelative: {
        type: String,
        default: null,
      },

      /**
       * Don't open dropdown if disabled is true
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Customize transition of dropdown opening.
       * Read more about it on the special page in documentation
       */
      transition: String,
      transitionProps: Object as PropType<TransitionOptions>,
    },
    data () {
      return {
        val: this.value,
      };
    },
    computed: {
      /**
       * Compose classes from the ui-configuration and dynamic properties
       * to pass to wrapper, trigger or dropdown
       */
      wrapperClasses (): string|null {
        const component = this.$iui.config.components.dropdown;
        return composeClasses(
          this.$iui.config.globalClass,
          component.class,
          isProperties(component.isProperties, this.$attrs),
          this.disabled ? component.disabledClass : '',
          this.val ? component.openClass : component.closeClass
        );
      },
      triggerClasses (): string|null {
        const component = this.$iui.config.components.dropdown;
        return composeClasses(
          this.triggerClass,
          component.triggerClass,
          this.val ? component.openTriggerClass : component.closeTriggerClass
        );
      },
      dropdownClasses (): string|null {
        const component = this.$iui.config.components.dropdown;
        return composeClasses(
          this.dropdownClass,
          component.dropdownClass,
          this.val ? component.openDropdownClass : component.closeDropdownClass
        );
      },

      transitionName (): string | null {
        const component = this.$iui.config.components.dropdown;
        return this.transition || component.transition || null;
      },
    },
    watch: {
      value (val) {
        this.val = val;
      },
    },
    methods: {
      open () {
        if (this.disabled) return;

        this.val = true;
        this.$emit('close');
        this.$emit('change', true);
      },
      close () {
        this.val = false;
        this.$emit('close');
        this.$emit('change', false);
      },
      toggle () {
        if (this.val) this.close();
        else this.open();
      },
      onHover (val: boolean) {
        // TODO: add mobile touch screen property (probably in the config)
        if (window.matchMedia('(max-width: 1023px)').matches) return;
        if (!this.openOnHover) return;

        if (!val) this.close();
        else this.open();
      },
    },
  });
</script>
