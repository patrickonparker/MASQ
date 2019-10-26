<template>
  <q-card v-bind="blok">
    <component v-for="blok in blok.media" :key="blok._uid" :is="blok.component" :blok="blok" />
    <q-card-section
      v-if="blok.content.length > 0"
      :style="`max-height: ${blok.content_max_height}px;`"
      :class="blok.content_max_height ? 'scroll' : ''"
    >
      <component v-for="blok in blok.content" :key="blok._uid" :is="blok.component" :blok="blok" />
    </q-card-section>
    <q-card-actions
      v-if="blok.actions.length > 0"
      :align="blok.align_actions"
      :vertical="blok.stack_actions"
    >
      <component v-for="blok in blok.actions" :key="blok._uid" :is="blok.component" :blok="blok" />
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["blok"]
};
</script>
