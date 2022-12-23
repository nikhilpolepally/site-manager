using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.FileProviders;
using System.IO.Compression;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.AddResponseCompression();
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});
new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory()));
builder.Services.AddMvc().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
    o.JsonSerializerOptions.DictionaryKeyPolicy = null;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.DefaultModelsExpandDepth(-1);
});
if (app.Environment.IsDevelopment())
{

    app.UseCors(corsPolicyBuilder =>
    {

        corsPolicyBuilder
        .WithOrigins("http://localhost:8100", "http://localhost:4200")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
         .AllowCredentials()
        .AllowAnyHeader();
    });
}
else
{
    app.UseCors(corsPolicyBuilder =>
    {
        corsPolicyBuilder
        .WithOrigins("http://localhost", "https://localhost")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials()
        .AllowAnyHeader();
    });
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

