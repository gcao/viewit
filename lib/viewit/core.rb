require 'haml'
require 'erubis'

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

class Object
  def render_with_hash template, hash
    return 'TEMPLATE_NOT_DEFINED' if template.nil?
    Erubis::Eruby.new(template).result(hash)
  end
end
