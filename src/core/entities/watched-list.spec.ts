import { WatchedList } from "./watched-list";


class NumberWatchedList extends WatchedList<number> {
    compareItems(a: number, b: number): boolean {
        return a == b
    }
}

describe('WatchedList (UNIT)', () => {
    it('should be able to create a watched list with initial items', () => {
        const list = new NumberWatchedList([1, 2, 3])

        expect(list.currentItems).toEqual([1, 2, 3])
        expect(list.currentItems).toHaveLength(3)
    })

    it('should be able to add item to list with', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.add(4)

        expect(list.currentItems).toEqual([1, 2, 3, 4])

        expect(list.getNewItems()).toHaveLength(1)
        expect(list.getNewItems()).toEqual([4])
    })


    it('should be able to remove item to list with', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.remove(3)

        expect(list.currentItems).toEqual([1, 2])
        expect(list.currentItems).toHaveLength(2)

        expect(list.getRemovedItems()).toHaveLength(1)
        expect(list.getRemovedItems()).toEqual([3])
    })

    it('should be able to add an item even if it was removed before', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.add(4)
        list.remove(4)

        expect(list.currentItems).toEqual([1, 2, 3])
        expect(list.currentItems).toHaveLength(3)

        expect(list.getRemovedItems()).toHaveLength(0)
        expect(list.getNewItems()).toEqual([])

        expect(list.getNewItems()).toHaveLength(0)
        expect(list.getRemovedItems()).toEqual([])
    })

    it('should be able to update watched list items', () => {
        const list = new NumberWatchedList([1, 2, 3])

        list.update([1, 3, 5])

        expect(list.currentItems).toEqual([1, 3, 5])
        expect(list.currentItems).toHaveLength(3)

        expect(list.getNewItems()).toEqual([5])
        expect(list.getNewItems()).toHaveLength(1)

        expect(list.getRemovedItems()).toHaveLength(1)
        expect(list.getRemovedItems()).toEqual([2])
    })
})

