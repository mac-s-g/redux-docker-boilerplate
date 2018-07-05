import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import Entry from "./../../../src/js/entry"

describe("Entry", () => {
  it("renders into DOM", () => {
    expect(document.getElementById("app-container").children.length == 1)
  })
})
