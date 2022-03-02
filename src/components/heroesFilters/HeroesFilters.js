import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice'
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch()
    /* const filters = selectAll(store.getState()) */
    const {request} = useHttp()

    const filters = [
        {
          "id": "all",
          "name": "all",
          "label": "Все",
          "className": "btn-outline-dark"
        },
        {
          "id": "fire",
          "name": "fire",
          "label": "Огонь",
          "className": "btn-danger"
        },
        {
          "id": "water",
          "name": "water",
          "label": "Вода",
          "className": "btn-primary"
        },
        {
          "id": "wind",
          "name": "wind",
          "label": "Ветер",
          "className": "btn-success"
        },
        {
          "id": "earth",
          "name": "earth",
          "label": "Земля",
          "className": "btn-secondary"
        }
      ]

    useEffect(() => {
        dispatch(fetchFilters(filters))
    }, [])

    if(filtersLoadingStatus === 'loading') {
        return <Spinner/>
    }else if (filtersLoadingStatus === 'error'){
        return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            })

        return <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}
                >{label}</button>
        })
    }

    const elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;