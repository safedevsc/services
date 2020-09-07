import { demo } from "./demo";
test("Demo Test", () => {
    let testBody = { valid:true };
    expect(demo.validator(testBody)).toEqual(false);
})