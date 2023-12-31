import React, { useMemo, } from "react"
import { useLocation, } from 'react-router-dom'

export const convertArrayToGETParams = params => {
    let data = []
    for (let key in params) {
        if (params[key].length > 0) {
            data.push(`${key}=${params[key]}`)
        }
    }
    return data.join("&")
}

export function useQuery() {
    const { search } = useLocation()
  
    return useMemo(() => new URLSearchParams(search), [search])
}
