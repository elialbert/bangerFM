module.exports = {
  'sound-synth test': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#sound-synth')
      .assert.elementPresent('.instrumentBox')
      .assert.elementCount('.instrumentBox', 8)
      .sendKeys('#app', browser.Keys.DOWN_ARROW)
      .assert.elementPresent('.instrumentBox.selected')
      .assert.elementCount('.instrumentBox.selected', 1)
      .elements('class name', 'instrumentBox', function (resp) {
        this.assert.ok(typeof resp == "object", "got an obj")
        this.elementIdAttribute(resp.value[0].ELEMENT, 'class', function (resp2) {
          this.assert.ok(resp2.value == 'instrumentBox', 'first not selected')
        })
        this.elementIdAttribute(resp.value[2].ELEMENT, 'class', function (resp2) {
          this.assert.ok(resp2.value == 'instrumentBox selected', 'third selected')
        })
      })
      .sendKeys('#app', browser.Keys.SPACE)
      .sendKeys('#app', browser.Keys.UP_ARROW)
      .sendKeys('#app', browser.Keys.RIGHT_ARROW)
      .sendKeys('#app', browser.Keys.SPACE)

      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', 'w')
      .sendKeys('#app', browser.Keys.SPACE)
      .sendKeys('#app', browser.Keys.SPACE)
      .sendKeys('#app', browser.Keys.SPACE)
      .sendKeys('#app', browser.Keys.SPACE)


      .end()
  }
}
