import mhash from '../src/mhash'
import JimpImgClass from '../src/ImgClass/JimpImgClass'

test('#mhash', async () => {
  const target = [
    './img/img_a_196.jpg',
    './img/img_a_256.jpg',
    './img/img_a_256_dirty.jpg',
    './img/img_b_256.jpg'
  ]
  const imgs = await Promise.all(target.map(address => (new JimpImgClass()).init(address)))
  const hash = imgs.map(img => mhash(img))
  const score:number[][] = new Array(target.length)
  for (let i = 0; i < hash.length; i++) {
    score[i] = new Array(target.length)
    for (let j = 0; j < hash.length; j++) {
      score[i][j] = hash[i].degreeOfSimilarity(hash[j])
    }
  }
  // console.log(score)
  expect(score[0][1]).toBeGreaterThan(0.8)
  expect(score[0][2]).toBeGreaterThan(0.8)
})
