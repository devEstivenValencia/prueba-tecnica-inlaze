import dayjs from 'dayjs'
import React from 'react'

interface TextDateProps extends React.HTMLAttributes<HTMLSpanElement> {
	date: dayjs.ConfigType
	format: string
}

export function TextDate({ date, format, ...props }: TextDateProps) {
	return <span {...props}>{dayjs(date).format(format)}</span>
}
