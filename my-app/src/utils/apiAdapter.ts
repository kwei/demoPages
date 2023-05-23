import { DefaultApiFactory } from "@/apiModules/js/client"

export const getPageInfo = (id?: number) => {
    const apiFactory = DefaultApiFactory()
    if (id) return apiFactory.pageTitleIdGet(id)
    return apiFactory.pageTitleGet()
}

export const getTestInfo = () => {
    const apiFactory = DefaultApiFactory()
    return apiFactory.testGet()
}