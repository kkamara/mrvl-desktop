
export default class ComicService{
    shouldDisableLeftPaginator(key, comics) {
        if (!comics[key - 1]) {
            return true
        }
        return false
    }
    
    shouldDisableRightPaginator(key, comics) {
        if (!comics[key + 1]) {
            return true
        }
        return false
    }
}
