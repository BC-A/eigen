import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ValueUpdated } from "../generated/schema"
import { ValueUpdated as ValueUpdatedEvent } from "../generated/Counter/Counter"
import { handleValueUpdated } from "../src/counter"
import { createValueUpdatedEvent } from "./counter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let updater = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let oldValue = BigInt.fromI32(234)
    let newValue = BigInt.fromI32(234)
    let newValueUpdatedEvent = createValueUpdatedEvent(
      updater,
      oldValue,
      newValue
    )
    handleValueUpdated(newValueUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ValueUpdated created and stored", () => {
    assert.entityCount("ValueUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ValueUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "updater",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ValueUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldValue",
      "234"
    )
    assert.fieldEquals(
      "ValueUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newValue",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
