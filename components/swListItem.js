import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

export default function SWListItem(props) {
  return (
    <li className={utilStyles.listItemBig} key={props.idx + 1}>
      <Link href={`/starwars/${props.type}/${props.idx + 1}`}>
        <h3 className={utilStyles.heading3after}>{props.item.name}</h3>
      </Link>
    </li>
  )
}