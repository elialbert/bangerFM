<template>
  <div class="bank-choice-inner">
    <button v-for="n in 9" 
      class="bank-button"
      v-bind:class="{ selected: bankChoiceNum + 1 == n }"
      type="button" v-on:click="changeBank(n-1)">{{n}}
    </button> 
  </div>

</template>

<script>
export default {
  name: 'bank-choice',
  props: ['bankChoiceNum', 'bankType'],
  methods: {
    changeBank: function (n) {
      // stupid hack to actually store workspaces starting at 1
      if (this.bankType === 'workspace') {
        n += 1
      }
      this.$emit('changeBank', n, this.bankType)
    }
  }
}

</script>

<style>
.bank-button {
  padding: 4px;
  margin: 4px;
}
.bank-choice-inner {
  
}
</style>
