import { NextResponse } from 'next/server'
import { getProjectionsSample } from '@lib/projections'
export async function GET(){ const data=await getProjectionsSample(); return NextResponse.json(data) }
