import React, { useState, useEffect } from 'react'
import db from '@/data/db.json'
import HomeCardPropsType from '@/components/modules/HomeCard/HomeCard.Type';
import HomeCard from '@/components/modules/HomeCard/HomeCard';
function Homes() {

  const [mainDatas, setMainDatas] = useState<HomeCardPropsType[]>(db.homes);
  const [itemsPerPage, setItemsPerPage] = useState<HomeCardPropsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [paginationNumbers, setpaginationNumbers] = useState<number[]>();

  const itemCount: number = 6;

  let paginationNumbersTemp: number[] = [];
  let pageinationNummberLength: number = Math.ceil(mainDatas.length / itemCount)

  for (let i = 1; i <= pageinationNummberLength; i++) {
    paginationNumbersTemp.push(i);
  }
  const pageinationItemsCalculator = (
    datas: HomeCardPropsType[],
    itemCount: number,
    currPage: number,
    changeItemsPerPage: React.Dispatch<React.SetStateAction<HomeCardPropsType[]>>
  ) => {

    const indexOfLastItem = currPage * itemCount;
    const indexOfFirstItem = indexOfLastItem - itemCount;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);
    changeItemsPerPage(currentItems)

  }

  const changeCurrentPageHandler = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 700)

  }

  const searchItemHandler = (
    datas: HomeCardPropsType[],
    val: string,
    changeItemsPerPage: React.Dispatch<React.SetStateAction<HomeCardPropsType[]>>
  ) => {

    let tempItems = datas.filter(item => item.title.includes(val));
    changeItemsPerPage(tempItems);
  }

  const sortingHandler = (
    val: string,
    datas: HomeCardPropsType[],
    changeItemsPerPage: React.Dispatch<React.SetStateAction<HomeCardPropsType[]>>) => {

    let sortTemp = null;

    switch (val) {
      case 'price':
        sortTemp = [...datas].sort((a, b) => a.price - b.price);
        changeItemsPerPage(sortTemp)
        break;
      case 'room-count':
         sortTemp = [...datas].sort((a, b) => a.roomCount - b.roomCount);
        changeItemsPerPage(sortTemp)
        break;
      case 'size':
         sortTemp = [...datas].sort((a, b) => a.meterage - b.meterage);
        changeItemsPerPage(sortTemp)
        break;

      default:
        changeItemsPerPage([...datas])
        break;
    }
  }

  useEffect(() => {
    sortingHandler(sortValue, mainDatas, setItemsPerPage)
  }, [sortValue])

  useEffect(() => {
    searchItemHandler(
      mainDatas,
      searchValue,
      setItemsPerPage
    )
    setpaginationNumbers(searchValue ? [1] : paginationNumbersTemp)
  }, [searchValue])

  useEffect(() => {
    pageinationItemsCalculator(
      mainDatas,
      itemCount,
      currentPage,
      setItemsPerPage
    )

  }, [currentPage])


  return (
    <div className="home-section" id="houses">
      <div className="home-filter-search">
        <div className="home-filter">
          <select onChange={e => setSortValue(e.target.value)} defaultValue={sortValue} value={sortValue} name="" id="">
            <option value="-1" selected>انتخاب کنید</option>
            <option value="price">بر اساس قیمت</option>
            <option value="room-count">بر اساس تعداد اتاق</option>
            <option value="size">بر اساس اندازه</option>
          </select>
        </div>
        <div className="home-search">
          <input onChange={e => setSearchValue(e.target.value)}
            value={searchValue} type="text" placeholder="جستجو کنید" />
        </div>
      </div>
      <div className="homes">
        {
          itemsPerPage.length ? itemsPerPage.map(item => (

            <HomeCard key={item.id} {...item} />
          )) : <h2>اطلاعاتی برای نمایش وجود ندارد!</h2>
        }


      </div>
      <ul className="pagination__list">
        {paginationNumbers?.map(page => (
          <li onClick={() => changeCurrentPageHandler(page)} className={`pagination__item ${currentPage === page ? 'active' : null}`}>{page}</li>
        ))}


      </ul>
    </div>
  )
}

export default Homes;