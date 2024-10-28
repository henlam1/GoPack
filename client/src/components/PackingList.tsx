interface PackingListProps {
    categories: string[],
}

export default function PackingList(props: PackingListProps) {
    console.log(props.categories);

    const categoryList = props.categories.map( (category, index) => {
        const link = `#item${index+1}`
        return <li><a href={link}>{category}</a></li>
    })
    return (
        <div className="grid grid-cols-5">
            <ul className="menu bg-base-200 rounded-box sticky top-0">
                <li className="menu-title">Categories</li>
                {categoryList}

            </ul>
            <div className="col-span-4 carousel carousel-vertical w-full h-98">
                <div id="item1" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 1</h2>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item2" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 2</h2>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item3" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 3</h2>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item4" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 4</h2>

                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item5" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 5</h2>

                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item6" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 6</h2>

                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item7" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 7</h2>

                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
                <div id="item8" className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                    <h2>Category 8</h2>

                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 1</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 2</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 3</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                    <label className="cursor-pointer label">
                        <span className="label-text">Remember me 4</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                </div>
            </div>

            {/* <div className="carousel carousel-vertical rounded-box h-96">
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" />
                </div>
                <div className="carousel-item h-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" />
                </div>
                </div> */}
        </div>
    );
}