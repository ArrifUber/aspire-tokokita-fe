import { Icon } from "@iconify/react"

type value = {
  title: string
  value: string
  icon: string
  gradient: string
  subText?: string
  subTextExpenses?: string
  changes?: string
}

export default function CardPembelian({title, value, icon, gradient, subText, subTextExpenses, changes}: value) {
  return (
    <div
      className="flex items-center bg-surface border border-gray-200 rounded-2xl shadow p-4 gap-6"
    >
      <div
        className={`${gradient} text-background text-3xl w-18 h-18 rounded-2xl flex items-center justify-center shadow`}
      >
        <Icon icon={icon}/>
      </div>
      <span>
        <p className="text-lg">{title}</p>
        <strong className="text-xl">{value}</strong>

        {subTextExpenses ? 
          <div className={`flex gap-1 text-bold ${changes == 'up' ? 'text-red-800' : 'text-green-800'}`}>
            {changes == 'up' ? <Icon icon='gravity-ui:arrow-up' /> : <Icon icon='gravity-ui:arrow-down' />}
            <p>{subTextExpenses}</p>
            {changes == 'up' ? <p>increase</p> : <p>decrease</p> }
          </div>
        : ''}

        {subText ? <p>{subText}</p> : ''}
      </span>
    </div>
  )
}