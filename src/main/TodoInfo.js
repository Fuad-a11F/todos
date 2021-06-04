export default function TodoInfo({ number, clear, clearChecked, setShowTxt, showTxt }) {
    return (
        <div className='todoInfo__wrapper'>
            <div className="todoInfo">
                <div className="item__left">
                    <p>{number} item left</p>
                </div>
                <div>
                    <input type='radio' checked={showTxt[0]} name='nav' id='all' className="nav__btn" onChange={() => setShowTxt([true, false, false])}/>
                    <label className='label' htmlFor="all">All</label>
                    <input type='radio' name='nav' checked={showTxt[1]} id='active' className="nav__btn" onChange={() => setShowTxt([false, true, false])}/>
                    <label className='label' htmlFor="active">Active</label>
                    <input type='radio' name='nav' checked={showTxt[2]} id='completed' className="nav__btn" onChange={() => setShowTxt([false, false, true])}/>
                    <label className='label' htmlFor="completed">Completed</label>
                </div>
                <div className={clear > 0 ? 'item__clear': 'item__clear hidden' }>
                    <button className='clear-btn' onClick={clearChecked}>Clear completed</button>
                </div>
            </div>

        </div>
        
    )
}