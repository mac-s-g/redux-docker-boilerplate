import React from "react"
import Styled from "styled-components"

import { constants } from "./../../constants"

const { project_info } = constants

const Container = Styled.div`
  font-family: 'arial';
`

const Main = () => (
  <Container>
    <h1>{project_info.name}</h1>
    <h3>Created By: BOILERPLATE-AUTHOR</h3>

    <div>Try updating `/src/js/components/layout/Main.js`</div>
    <div>Hot reloading will automatically trigger a refresh</div>
  </Container>
)

export default Main
