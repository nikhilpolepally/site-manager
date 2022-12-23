namespace site_mangement_be.Model
{
    public class CreateSiteModel
    {
        public string locationName { get; set; } = null!;
        public dynamic latitude { get; set; } = null!;
        public dynamic longitude { get; set; } = null!;
        public string city { get; set; } = null!;
        public string? details { get; set; }

    }
}
