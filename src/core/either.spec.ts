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

    if (result.isRight()) {
        console.log(result.value)
    }

    expect(result.value).toEqual(1)
})


test('either left', () => {
    const result = doSomething(false)

    if (result.isLeft()) {
        console.log(result.value)
    }

    expect(result.value).toEqual('error')
})