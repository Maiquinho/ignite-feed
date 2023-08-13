import { Header } from './components/Header'
import { Sidebar } from './components/Siderbar'
import { Post } from './components/Post'

import styles from './App.module.css'

import './global.css'


export default function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>

          <Post author="Michael Matheus" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel incidunt, perspiciatis error rem voluptatem commodi ad amet accusamus doloremque. Perspiciatis exercitationem ipsa culpa doloribus blanditiis vel ut eligendi cum accusamus?" />
          <Post author="Bianca Marques" content="Um post muito legal!" />

        </main>
      </div>
    </div>
  )
}
