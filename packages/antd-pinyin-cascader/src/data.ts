import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

areas.forEach((area) => {
    type MatchCity = typeof cities extends Array<infer P>
        ? P & {children?: {label: string; value: string}[]}
        : never;

    const matchCity: MatchCity = cities.filter(
        (city) => city.code === area.cityCode,
    )[0];

    if (matchCity) {
        matchCity.children =
            matchCity.children || ([] as {label: string; value: string}[]);
        matchCity.children.push({
            label: area.name,
            value: area.code,
        });
    }
});
type Cities = typeof cities extends Array<infer P>
    ? Array<P & {children?: Array<any>}>
    : never;
(cities as Cities).forEach((city) => {
    type MatchProvince = typeof provinces extends Array<infer P>
        ? P & {children?: {label: string; value: string; children: any[]}[]}
        : never;
    const matchProvince: MatchProvince = provinces.filter(
        (province) => province.code === city.provinceCode,
    )[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children!,
        });
    }
});
type Provinces = typeof provinces extends Array<infer P>
    ? Array<P & {children?: Array<any>}>
    : never;

export const options = (provinces as Provinces).map((province) => ({
    label: province.name,
    value: province.code,
    children: province.children,
}));
