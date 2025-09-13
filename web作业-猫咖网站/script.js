document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideInterval = 3000; // 3秒切换
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 下一张
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // 上一张
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // 自动轮播
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // 按钮事件
    nextBtn.addEventListener('click', () => {
        clearInterval(slideTimer);
        nextSlide();
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideTimer);
        prevSlide();
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    // 导航点事件
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideTimer);
            showSlide(parseInt(this.dataset.index));
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
    
    // 鼠标悬停暂停
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
    slider.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    // 触摸滑动支持（移动端）
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) { // 向左滑动
            clearInterval(slideTimer);
            nextSlide();
            slideTimer = setInterval(nextSlide, slideInterval);
        } else if (touchEndX - touchStartX > 50) { // 向右滑动
            clearInterval(slideTimer);
            prevSlide();
            slideTimer = setInterval(nextSlide, slideInterval);
        }
    });

    const descriptions = {
           0: `<p>大王今年一岁，是一只优雅的布偶猫，拥有金灿灿的眼睛和蓬松的长毛。它性格温顺，喜欢被抱在怀里，是店里的招牌猫咪。</p>
               <p>大王特别喜欢吃三文鱼零食，每当闻到鱼味就会竖起尾巴跑来。</p>
               <p>它最喜欢的活动是在窗边晒太阳，看着路过的行人。</p>`,
           
           
           1: `<p>白雪今年三岁，是典型的 “黏人小话痨”，自带软萌属性却不娇气，性格活泼好动。它特别喜欢玩毛线球和追逐激光点，是店里的开心果。</p>
               <p>白雪有着粉嫩的肉垫和蓝宝石般的眼睛，最喜欢趴在顾客的腿上睡觉。</p>
               <p>它有一个特别的习惯，就是每次吃完饭都要洗脸十分钟。她还喜欢把玩具藏在沙发底下，比如小皮球、毛绒鱼，偶尔会自己扒开沙发底，把玩具叼出来玩一会儿，玩完再藏回去。</p>`,
      
           2: `<p>笨笨是一只可爱的狸花猫，今年一岁，虽然名字叫笨笨，但其实非常聪明。</p>
               <p>它会自己开笼子门，还会用爪子按饮水机喝水。笨笨特别喜欢和客人互动，会主动蹭人的腿要摸摸。</p>
               <p>它有一个小秘密——害怕黄瓜，看到就会炸毛逃跑。</p>`,
      
           3: `<p>煤球今年两岁，是一只活泼的美短猫，全身乌黑发亮，有一双亮晶晶的绿色眼睛。</p>
               <p>它精力旺盛，喜欢在猫爬架上跳来跳去。煤球特别擅长捉迷藏，经常躲在纸箱里突然跳出来吓人。</p>
               <p>它最爱吃鸡肉冻干，听到包装袋声音就会飞奔过来。每天傍晚必须去阳台 “巡视”，看看窗外的小鸟和树叶，嘴里还会发出轻轻的 “咕噜” 声。</p>`
        };

// 获取描述区域
    const descArea = document.querySelector('.image-description p');

// 为每张图片添加点击事件
     slides.forEach((slide, index) => {
          const img = slide.querySelector('img');
          img.addEventListener('click', () => {
          descArea.innerHTML = descriptions[index];
       });
    });
});