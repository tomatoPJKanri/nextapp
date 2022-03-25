import moment from "moment";

export function timeCalculation(date: number): string {
    const today = moment(new Date());
    const postDate: string = formatDate(date);
    let betweenTime: (string | number) = today.diff(postDate, 'hours');
    if (betweenTime > 23) return (betweenTime = formatDate_day(date));
    if (betweenTime === 0) {
        return (betweenTime = today.diff(postDate, 'minutes') + ' minutes ago');
    }

    return betweenTime + ' hours ago';
}


export const formatDate = (date: number): string => {
    const formatedDate = moment(date).format('YYYY-MM-DD HH:mm');
    return formatedDate;
};

export const formatDate_day = (date: number): string => {
    const formatDate_day = moment(date).format('YYYY-MM-DD');
    return formatDate_day;
};

