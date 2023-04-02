package com.ssafy.specialization.entity;

import com.ssafy.specialization.entity.enums.Press;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class News {

    @Column(name = "news_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @Enumerated(EnumType.STRING)
//    private Category category;
    private String title;
    private String content;
    private LocalDateTime newsDate;
    private String reporter;
    private String press;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private List<NewsImage> newsImageList = new ArrayList<>();

    public News(String title, String content, String newsDate, String reporter, Press press, NewsImage... newsImages){

    }

    protected void setTitle(String title) {
        this.title = title;
    }

    protected void setContent(String content) {
        this.content = content;
    }

    protected void setNewsDate(LocalDateTime newsDate) {
        this.newsDate = newsDate;
    }

    protected void setReporter(String reporter) {
        this.reporter = reporter;
    }

    protected void setPress(String press) {
        this.press = press;
    }
    protected void addNewsImage(NewsImage newsImage) {
        this.newsImageList.add(newsImage);
        newsImage.setNews(this);
    }

}
