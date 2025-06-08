import { NextResponse } from "next/server";

export async function GET() {
    const url = 'https://zenquotes.io/api/quotes';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
        }
        const data = await response.json();
        return NextResponse.json({data:data}, { status: 200 });
    }


    catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
    
    
}