package bg.sofia.uni.fmi.melodify.mapper;

import bg.sofia.uni.fmi.melodify.dto.PlaylistDto;
import bg.sofia.uni.fmi.melodify.dto.SongDto;
import bg.sofia.uni.fmi.melodify.model.Playlist;
import bg.sofia.uni.fmi.melodify.model.Song;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ArtistMapper.class})
public interface SongMapper {
    SongMapper INSTANCE = Mappers.getMapper(SongMapper.class);

    @Mapping(source = "artists", target = "artistDtos")
    SongDto toDto(Song songEntity);

    @Mapping(source = "artistDtos", target = "artists")
    Song toEntity(SongDto songDto);

    List<SongDto> toDtoCollection(Collection<Song> songEntities);

    List<Song> toEntityCollection(Collection<SongDto> songDtos);
}