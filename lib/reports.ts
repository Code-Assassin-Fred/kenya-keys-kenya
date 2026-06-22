export interface Report {
    title: string;
    filename: string;
    type?: string;
}

export interface YearGroup {
    year: number;
    reports: Report[];
}

export const reportsData: YearGroup[] = [
    {
        year: 2026,
        reports: [
            { title: 'Narrative Report - February', filename: 'KENYA KEYS NARRATIVE REPORT FOR FEBRUARY 2026.pdf' },
            { title: 'Narrative Report - January', filename: 'KENYA KEYS NARRATIVE REPORT FOR JANUARY 2026.pdf' },
            // { title: 'Finance Management Report - March', filename: 'Finance Management Report March 2026.xlsx' },
        ]
    },
    {
        year: 2025,
        reports: [
            { title: 'Annual Report', filename: 'Kenya+Keys+Annual+Report+2025.pdf' },
            { title: 'Narrative Report - August', filename: 'KENYA KEYS NARRATIVE REPORT FOR AUGUST FINAL.pdf' },
            { title: 'Narrative Report - July', filename: 'KENYA KEYS NARRATIVE REPORT FOR JULY 2025 .pdf' },
            { title: 'Narrative Report - October', filename: 'KENYA KEYS NARRATIVE REPORT FOR OCTOBER 2025..pdf' },
            { title: 'Narrative Report - September', filename: 'KENYA KEYS NARRATIVE REPORT FOR SEPTEMBER 2025...pdf' },
            { title: 'Annual Return Form', filename: 'Annual Return Form 2025 - Kenya Keys.xls' },
        ]
    }
];
