const baseURL:string = "https://restcountries.com/v3.1";

interface APIInterface {
    baseURL: string,
    all: string,
    alphaSearch: string,
    nameSearch: string,
    regionSearch: string,
}
export const API : APIInterface = {
    baseURL: baseURL,
    all: `${baseURL}/all`,
    alphaSearch: `${baseURL}/alpha`,
    nameSearch: `${baseURL}/name`,
    regionSearch: `${baseURL}/region`,
};