import {useEffect, useState} from "react";
import {getPageInfo, getTestInfo} from "@/utils/apiAdapter";
import {ApiPageTitleResType} from "@/app/api/pageTitle/type";
import {ApiPageDescResType} from "@/app/api/pageTitle/[id]/type";
import {ApiTestResType} from "@/app/api/test/type";

export const useFetchPageTitle = () => {
    const [data, setData] = useState<string>('Loading...')
    const [loading, setLoading] = useState(<boolean>false)

    useEffect(() => {
        setLoading(true)
        getPageInfo().then(res => {
            if (res.status === 200) return res.data
        }).then(res => {
            console.log("get user info: ", res)
            if (!res) return
            const data = res as ApiPageTitleResType
            setData(data.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return { data, loading }
}

export const useFetchPageDesc = () => {
    const [data, setData] = useState<string[]>(['Loading...'])
    const [loading, setLoading] = useState(<boolean>false)

    useEffect(() => {
        setLoading(true)
        getPageInfo(123).then(res => {
            if (res.status === 200) return res.data
        }).then(res => {
            console.log("get user info with id: ", res)
            if (!res) return
            const data = res as ApiPageDescResType
            setData(data.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return { data, loading }
}

export const useFetchTest = () => {
    const [data, setData] = useState<string>('Loading...')
    const [loading, setLoading] = useState(<boolean>false)

    useEffect(() => {
        setLoading(true)
        getTestInfo().then(res => {
            if (res.status === 200) return res.data
        }).then(res => {
            console.log("get test info: ", res)
            if (!res) return
            const data = res as ApiTestResType
            setData(data.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return { data, loading }
}