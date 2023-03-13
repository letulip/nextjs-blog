import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function SWListItem(props) {
  const type = props.type === `people` ? `people` : `planets`
  return (
    <li className={utilStyles.listItem} key={props.idx + 1}>
      <Link href={`/starwars/${type}/${props.idx + 1}`}>
        <h3 className={utilStyles.heading3after}>{props.item.name}</h3>
      </Link>
    </li>
  )
}