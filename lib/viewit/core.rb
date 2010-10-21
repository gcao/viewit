require 'haml'

class Viewit
  def initialize template
    @template = template
  end
  
  def apply model
    @model = model
    self
  end
  
  def render file = nil
    @compiled_template ||= Haml::Engine.new(@template)
    result = @compiled_template.render @model
    
    unless file.nil?
      File.open(file, "w") do |f|
        f.write result
      end
    end

    result
  end
end
