import { Either, left, right } from "./either"


function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(1)
    } else {
        return left('error')
    }
}

test('either right', () => {
    const result = doSomething(true)

    expect(result.value).toEqual(1)
})


test('either left', () => {
    const result = doSomething(false)

    expect(result.value).toEqual('error')
})