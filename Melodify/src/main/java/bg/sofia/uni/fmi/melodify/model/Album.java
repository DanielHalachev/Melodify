package bg.sofia.uni.fmi.melodify.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "album")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "release_date")
    private LocalDateTime releaseDate;

    @Column(name = "genre")
    @ManyToOne
    @JoinColumn(name = "id")
    private Genre genre;

    @Column(name = "image")
    private String image;

    @OneToMany
    @JoinColumn(name = "id")
    private List<Song> songs;

    @Column(name = "uri")
    private String uri;
}
