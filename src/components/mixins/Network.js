module.exports = {
  data: function () {
    return {
      waiting: {}
    }
  },
  methods: {
    networkWait: function (name, cb) {
      if (this.waiting[name] === undefined) {
        this.waiting[name] = 0
      } else {
        this.waiting[name] += 1
      }
      let val = this.waiting[name]
      setTimeout(() => {
        if (val === this.waiting[name]) {
          cb()
        }
      }, 250)
    }
  }
}
