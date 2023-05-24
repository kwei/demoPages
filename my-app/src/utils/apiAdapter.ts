import { PageApiFactory, TestApiFactory } from "@/apiModules/js/client"

export const getPageInfo = (id?: number) => {
    const apiFactory = PageApiFactory()
    if (id) return apiFactory.pageTitleIdGet(id)
    return apiFactory.pageTitleGet()
}

export const getTestInfo = () => {
    const apiFactory = TestApiFactory()
    return apiFactory.testGet()
}