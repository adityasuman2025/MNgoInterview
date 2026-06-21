import { INTERVIEW_DATA_KEY } from './constants';

/**
 * Always fetches and parses /WebTech.html so the data is always up-to-date.
 * Stores the fresh result in localStorage after every parse.
 */
export async function getInterviewData(): Promise<{ [key: string]: any }> {
    try {
        const response = await fetch("/WebTech.html");
        const htmlText = await response.text();

        // Parse the HTML string into a DOM tree
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const body = doc.body;

        const parsed = htmlToObject(body);

        // Only overwrite cache when we got real data — never wipe a good cache with an empty result
        if (Object.keys(parsed).length > 0) {
            localStorage.setItem(INTERVIEW_DATA_KEY, JSON.stringify(parsed));
        } else {
            throw Error;
        }

        return parsed;
    } catch {
        // Fetch or parse failed — return last known good data from localStorage
        const cached = localStorage.getItem(INTERVIEW_DATA_KEY);
        if (cached) return JSON.parse(cached);
        return {};
    }
}

export function htmlToObject(htmlContent: HTMLElement) {
    const TITLE_IDENTIFIER = ["title"]; // classes that identify a title
    const QSTN_IDENTIFIER = ["h1"]; // tags that identify a question

    function hasClass(classList: any, classNames: string[]) {
        return classNames.findIndex(className => classList.contains(className)) > -1;
    }

    const json: { [key: string]: any } = {};

    let currentTitle, currentQstn;
    const children: any = htmlContent.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const classList = child.classList;

        const isTitle = hasClass(classList, TITLE_IDENTIFIER);
        const isQstn = QSTN_IDENTIFIER.includes(child.tagName.toLowerCase());

        if (isTitle) {
            currentTitle = child.innerText;
            currentQstn = null; // if current dom element is title then reset currentQstn
        }
        if (isQstn) currentQstn = child.innerText;

        if (currentTitle && currentQstn) {
            if (!json?.[currentTitle]) json[currentTitle] = {};
            if (!json?.[currentTitle]?.[currentQstn]) json[currentTitle][currentQstn] = [];

            if (!isTitle && !isQstn) {
                json[currentTitle][currentQstn].push(child.outerHTML);
            }
        }
    }

    return json;
}

export function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element.
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; // swapping
    }

    return array;
}

export function secondsToMMSS(seconds: number) {
    let minutes: number | string = Math.floor(seconds / 60);
    let remainingSeconds: number | string = seconds % 60;

    if (minutes < 10) minutes = "0" + String(minutes);
    if (remainingSeconds < 10) remainingSeconds = "0" + String(remainingSeconds);

    return `${minutes}:${remainingSeconds}`;
}

export function toSentenceCase(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}