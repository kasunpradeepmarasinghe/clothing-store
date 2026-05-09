import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const order = await req.json()

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_name: order.customer_name,
        phone: order.phone,
        address: order.address,
        city: order.city,
        items: order.items,
        total: order.total,
        payment_method: order.payment_method,
        status: 'pending',
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, order: data })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
